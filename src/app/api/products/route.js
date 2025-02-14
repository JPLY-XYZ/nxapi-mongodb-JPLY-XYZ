import { connectToDatabase } from "@/lib/mongodb";



export async function GET(request) {
    const { database } = await connectToDatabase();
    const collection = database.collection("products");

    const results = await collection.find({}).toArray();

    return Response.json(results);
}

export async function POST(request) {
    if (request.headers.get("content-type") !== "application/json") {
        return Response.json(
            { message: "Debes proporcionar datos JSON" },
        );
    }

    const { database } = await connectToDatabase();
    const collection = database.collection("products");

    const { nombre, descripcion, imagen, fecha_entrada } = await request.json();

    const newProduct = {
        nombre,
        descripcion,
        imagen,
        fecha_entrada
    };

    const results = await collection.insertOne(newProduct);

    return Response.json(results);
}

