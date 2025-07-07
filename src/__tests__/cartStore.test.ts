import { act } from "react-dom/test-utils";
import { useCartStore } from "../store/cartStore";
import { cartItem } from "../types/CartItem";

describe("Cart Store", () => {
    beforeEach(() => {
        act(() => {
            useCartStore.getState().clearCart();
        });
    });

    it("should add item to cart", () => {
        const item: cartItem = {
            id: 1,
            imageSrc: "img.png",
            name: "Test Product",
            price: 100,
            size: "M",
            quantity: 2,
        };
        act(() => {
            useCartStore.getState().addItem(item);
        });
        expect(useCartStore.getState().items).toHaveLength(
            1
        );
        expect(
            useCartStore.getState().items[0]
        ).toMatchObject(item);
    });

    it("should increase quantity if same id and size is added", () => {
        const item: cartItem = {
            id: 1,
            imageSrc: "img.png",
            name: "Test Product",
            price: 100,
            size: "M",
            quantity: 2,
        };
        act(() => {
            useCartStore.getState().addItem(item);
            useCartStore
                .getState()
                .addItem({ ...item, quantity: 3 });
        });
        expect(useCartStore.getState().items).toHaveLength(
            1
        );
        expect(
            useCartStore.getState().items[0].quantity
        ).toBe(5);
    });

    it("should remove item by id", () => {
        const item: cartItem = {
            id: 1,
            imageSrc: "img.png",
            name: "Test Product",
            price: 100,
            size: "M",
            quantity: 2,
        };
        act(() => {
            useCartStore.getState().addItem(item);
            useCartStore.getState().removeItem(1);
        });
        expect(useCartStore.getState().items).toHaveLength(
            0
        );
    });

    it("should update quantity by id", () => {
        const item: cartItem = {
            id: 1,
            imageSrc: "img.png",
            name: "Test Product",
            price: 100,
            size: "M",
            quantity: 2,
        };
        act(() => {
            useCartStore.getState().addItem(item);
            useCartStore.getState().updateQuantity(1, 10);
        });
        expect(
            useCartStore.getState().items[0].quantity
        ).toBe(10);
    });

    it("should clear cart", () => {
        const item: cartItem = {
            id: 1,
            imageSrc: "img.png",
            name: "Test Product",
            price: 100,
            size: "M",
            quantity: 2,
        };
        act(() => {
            useCartStore.getState().addItem(item);
            useCartStore.getState().clearCart();
        });
        expect(useCartStore.getState().items).toHaveLength(
            0
        );
    });
});
