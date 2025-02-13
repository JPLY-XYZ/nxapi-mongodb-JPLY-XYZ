import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function OPTIONS() {
    return new Response(null, { status: 204 });
}

export async function GET(request, { params }) {
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    const { id } = await params;
    const results = await collection.find({ _id: new ObjectId(id) }).toArray();

    return new Response(JSON.stringify(results[0]));
}

export async function PUT(request, { params }) {
    if (request.headers.get("content-type") !== "application/json") {
        return new Response(JSON.stringify({ message: 'Debes proporcionar datos JSON' }));
    }

    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    const { id } = await params;
    const { nombre, descripcion, imagen, fecha_entrada } = await request.json();
    const results = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { nombre, descripcion, imagen, fecha_entrada } }
    );

    return new Response(JSON.stringify(results));
}

export async function DELETE(request, { params }) {
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    const { id } = await params;
    const results = await collection.deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify(results), {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
}

