import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { compare } from "bcryptjs";
import { runtimeUsers } from "@/data/mockData";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.warn("Missing credentials");
          return null;
        }

        let user;
        if (!isSupabaseConfigured) {
          user = runtimeUsers.find((u) => u.email === credentials.email);
          if (!user) {
            console.warn("User not found in runtimeUsers:", credentials.email);
            return null;
          }
        } else {
          const { data, error } = await supabase
            .from("users")
            .select("id, name, email, password")
            .eq("email", credentials.email)
            .single();

          if (error || !data) {
            console.error("User not found in Supabase:", error);
            return null;
          }
          user = data;
        }

        if (!user.password) {
          console.warn("User has no password set (possibly OAuth account)");
          return null;
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          console.warn("Invalid password");
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "dappermen-nextauth-secret-key-12345",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
