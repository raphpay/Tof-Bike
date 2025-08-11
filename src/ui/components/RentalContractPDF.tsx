import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

// Styles pour PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 8,
    fontWeight: "bold",
  },
  row: {
    marginBottom: 4,
  },
});

type Bike = { quantity: number; type: string };
type Accessory = { quantity: number; type: string; other?: string };

type RentalData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bikes: Bike[];
  accessories: Accessory[];
  startDateTime: Date;
  createdAt: Date;
  signature?: string; // si tu stockes une signature image ou texte
  acceptTerms: boolean;
  acceptPrivacy: boolean;
};

const formatDate = (date: any, showTime: boolean = false) => {
  if (date && typeof date.toDate === "function") {
    date = date.toDate();
  }

  if (!(date instanceof Date)) {
    return "Date invalide";
  }

  let dateString = date.toLocaleDateString("fr-FR");
  if (showTime) {
    dateString +=
      " " +
      date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  }
  return dateString;
};

export const RentalContractPdf: React.FC<{ data: RentalData }> = ({ data }) => (
  <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Contrat de location de vélo</Text>
        <Text style={styles.row}>Nom du prestataire: TOF' BIKE</Text>
        <Text style={styles.row}>
          Adresse: 68, rue du Père Boiteau, 97413 CILAOS
        </Text>
        <Text style={styles.row}>Téléphone: 0262 73 42 05 | 0692 25 61 61</Text>
        <Text style={styles.row}>Email: tofbike413@live.fr</Text>

        <Text style={styles.sectionTitle}>Informations du client</Text>
        <Text style={styles.row}>
          Nom prénom: {data.firstName} {data.lastName}
        </Text>
        <Text style={styles.row}>Email: {data.email}</Text>
        <Text style={styles.row}>Numéro de téléphone: {data.phone}</Text>
        <Text style={styles.row}>Pièce d'identité présentée: Oui</Text>

        <Text style={styles.sectionTitle}>Informations du matériel loué</Text>
        {data.bikes.length > 0 && (
          <View style={{ marginBottom: 8 }}>
            <Text>Vélos:</Text>
            {data.bikes.map((b, i) => (
              <Text key={i}>
                - {b.quantity} x {b.type}
              </Text>
            ))}
          </View>
        )}
        {data.accessories.length > 0 && (
          <View style={{ marginBottom: 8 }}>
            <Text>Accessoires:</Text>
            {data.accessories.map((a, i) => (
              <Text key={i}>
                - {a.quantity} x {a.type} {a.other || ""}
              </Text>
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>Date et heure de location</Text>
        <Text style={styles.row}>{formatDate(data.startDateTime, true)}</Text>

        <Text style={styles.sectionTitle}>Conditions</Text>
        {/* Ici tu peux afficher les conditions (acceptTerms etc.) si tu veux */}
        <Text style={styles.row}>
          Acceptation des termes: {data.acceptTerms ? "Oui" : "Non"}
        </Text>
        <Text style={styles.row}>
          Politique de confidentialité: {data.acceptPrivacy ? "Oui" : "Non"}
        </Text>

        <Text style={styles.sectionTitle}>Signature</Text>
        {data.signature ? (
          <Text>{data.signature}</Text> // Ou tu peux afficher une image si tu as un lien base64
        ) : (
          <Text>Pas de signature</Text>
        )}

        <Text style={{ marginTop: 30 }}>
          Fait à Cilaos, le {formatDate(data.createdAt)}
        </Text>
      </Page>
    </Document>
  </PDFViewer>
);
