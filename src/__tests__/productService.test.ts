import { getProductSizeQty } from "@/services/productService";

global.fetch = jest.fn();

describe("getProductSizeQty", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Find size available in the mocked API response
  it("returns correct size quantity", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [
          { size: "S", stock: 5 },
          { size: "M", stock: 10 },
        ],
      }),
    });

    const result = await getProductSizeQty(1, "M");

    expect(fetch).toHaveBeenCalledWith("/api/products/1/sizes");
    expect(result).toEqual(10);
  });

  // Size not found in the mocked API response
  it("returns 0 if size not found", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [{ size: "S", stock: 5 }],
      }),
    });

    const result = await getProductSizeQty(1, "XL");

    expect(result).toEqual(0);
  });

  // API returns success: false
  it("throws error when api fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: false,
      }),
    });

    await expect(getProductSizeQty(1, "M")).rejects.toThrow(
      "Failed to fetch sizes"
    );
  });

  // Network or other fetch error
  it("throws error when fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(getProductSizeQty(1, "M")).rejects.toThrow("Network error");
  });
});
