import { db } from "@/lib/firebase"
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"

type InsightData = {
    dominant: string
    weakest: string
    insight: string
    theme: string
}

type SaveResultsInput = {
    userId?: string
    email: string
    responses: Record<string, number>
    scores: Record<string, number>
    insightData: InsightData
    leadCapture?: boolean
}

export async function saveResults({
    userId,
    email,
    responses,
    scores,
    insightData,
    leadCapture = false
}: SaveResultsInput): Promise<boolean> {
    try {
        const data = {
            timestamp: serverTimestamp(),
            email,
            responses,
            scores,
            dominant: insightData.dominant,
            weakest: insightData.weakest,
            insight: insightData.insight,
            theme: insightData.theme
        }

        let docRef
        if (userId) {
            docRef = doc(db, "quizResults", userId)
            await setDoc(docRef, data, { merge: true })
        } else {
            docRef = await addDoc(collection(db, "quizResults"), data)
        }

        if (leadCapture) {
            const leadData = {
                email,
                scores,
                dominant: insightData.dominant,
                timestamp: serverTimestamp(),
                source: "quiz"
            }
            await addDoc(collection(db, "leads"), leadData)
        }

        return true
    } catch (error) {
        console.error("[saveResults] Firestore write error:", error)
        return false
    }
}
