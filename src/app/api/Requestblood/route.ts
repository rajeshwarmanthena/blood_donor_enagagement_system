import prisma from "@/app/libs/prismadb"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest, response: NextResponse) => {
    try {
        const body = await request.json();
        const { patientName, mobileNumber, bloodType, hospital } = body;

        const requestblood = await prisma.requestblood.create({
            data: {
                patientName,
                mobileNumber,
                bloodType,
                hospital
            }
        });
        return NextResponse.json(requestblood);
    } catch (err) {
        return NextResponse.json({ message: "POST Error", err }, { status: 500 })
    }
}

export const GET = async () => {
    try {
        const patients = await prisma.requestblood.findMany()
        const response = NextResponse.json({
            message: "Patients fetched successfully",
            success: true,
            patients,
          });      
          return response;
    } catch (err) {
        return NextResponse.json({ message: "GET Error", err }, { status: 500 })
    }
}
