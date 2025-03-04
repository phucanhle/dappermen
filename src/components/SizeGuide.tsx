import Image from "next/image";
export default function SizeGuide() {
    const sizeMap = [
        { size: "S", bust: 86, waist: 66 },
        { size: "M", bust: 91, waist: 71 },
        { size: "L", bust: 96, waist: 76 },
        { size: "XL", bust: 101, waist: 81 },
        { size: "XXL", bust: 106, waist: 86 },
    ];

    return (
        <div className="w-full text-center bg-white p-4">
            <h1 className="font-bold text-2xl mb-4">SIZE GUIDE</h1>
            <table className="w-full bg-[#ebebeb] border border-white">
                <thead>
                    <tr>
                        <th className="border-2 border-white py-2 capitalize">Size</th>
                        <th className="border-2 border-white py-2 capitalize">Bust</th>
                        <th className="border-2 border-white py-2 capitalize">Waist</th>
                    </tr>
                </thead>
                <tbody>
                    {sizeMap.map((size) => (
                        <tr key={size.size}>
                            <td className="border-2 border-white py-2">{size.size}</td>
                            <td className="border-2 border-white py-2">{size.bust}</td>
                            <td className="border-2 border-white py-2">{size.waist}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="w-full flex justify-between mt-6 flex-wrap">
                <div>
                    <h1 className="font-bold text-left my-2">Bust</h1>
                    <div className="flex flex-start flex-wrap gap-1 text-left">
                        <Image src="/size/bust.png" alt="bust-size" width={280} height={400} />
                        <p className="w-36">Measure around the bust at the most protruding point.</p>
                    </div>
                </div>
                <div>
                    <h1 className="font-bold text-left my-2">Waist</h1>
                    <div className="flex flex-start flex-wrap gap-1 text-left">
                        <Image src="/size/waist.png" alt="waist-size" width={280} height={400} />
                        <p className="w-36">Measure round the narrowest part of the abdomen.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
