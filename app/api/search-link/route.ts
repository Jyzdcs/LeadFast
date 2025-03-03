import { NextRequest, NextResponse } from "next/server";
import { generateSearchLink } from "@/lib/searchEngineService";

/**
 * API route pour générer un lien de recherche
 */
export async function POST(request: NextRequest) {
  try {
    // Récupérer les données de la requête
    const requestData = await request.json();

    // Valider les données
    if (!requestData) {
      return NextResponse.json(
        { error: "Données de recherche manquantes" },
        { status: 400 }
      );
    }

    // Générer le lien de recherche
    const searchLink = await generateSearchLink(requestData);

    // Retourner le lien généré
    return NextResponse.json({ searchLink });
  } catch (error) {
    console.error("Erreur lors de la génération du lien de recherche:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération du lien de recherche" },
      { status: 500 }
    );
  }
}
