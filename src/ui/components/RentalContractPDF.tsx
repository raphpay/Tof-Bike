// RentalContractPDF.tsx
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import type Accessory from "../../business-logic/models/Accessory";
import type Bike from "../../business-logic/models/Bike";
import type RentalData from "../../business-logic/models/RentalData";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
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
  row: { marginBottom: 4 },
});

const formatDate = (date: any, showTime = false) => {
  if (date && typeof date.toDate === "function") date = date.toDate();
  if (!(date instanceof Date)) return "Date invalide";

  let dateString = date.toLocaleDateString("fr-FR");
  if (showTime) {
    dateString +=
      " " +
      date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  }
  return dateString;
};

const formatBikeType = (bike: Bike) =>
  bike.type === "electric" ? "Vélo électrique" : "Vélo classique";
const formatAccessoryType = (accessory: Accessory) => {
  switch (accessory.type) {
    case "helmet":
      return "Casque";
    case "lock":
      return "Antivol";
    case "pump":
      return "Pompe à vélo";
    case "repairKit":
      return "Kit de réparation";
    default:
      return accessory.other || "Accessoire inconnu";
  }
};

// Fonction qui retourne un Blob PDF
export async function generateRentalContractPdf(data: RentalData) {
  const doc = (
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
        {data.bikes?.length > 0 && (
          <View style={{ marginBottom: 8 }}>
            <Text>Vélos:</Text>
            {data.bikes.map((b, i) => (
              <Text key={i}>
                - {b.quantity} x {formatBikeType(b)}
              </Text>
            ))}
          </View>
        )}
        {data.accessories?.length > 0 && (
          <View style={{ marginBottom: 8 }}>
            <Text>Accessoires:</Text>
            {data.accessories.map((a, i) => (
              <Text key={i}>
                {a.other
                  ? `- ${a.other}`
                  : `- ${a.quantity} x ${formatAccessoryType(a)}`}
              </Text>
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>Date et heure de location</Text>
        <Text style={styles.row}>{formatDate(data.startDateTime, true)}</Text>

        <Text style={styles.sectionTitle}>Conditions</Text>
        <Text style={styles.row}>
          Acceptation des termes: {data.acceptTerms ? "Oui" : "Non"}
        </Text>
        <Text style={styles.row}>
          Politique de confidentialité: {data.acceptPrivacy ? "Oui" : "Non"}
        </Text>

        <Text style={{ marginTop: 30 }}>
          Fait à Cilaos, le {formatDate(data.createdAt)}
        </Text>
        {data.signature ? (
          <Image src={data.signature} style={{ width: 150, height: 80 }} />
        ) : (
          <Text>Pas de signature</Text>
        )}
      </Page>
    </Document>
  );

  return pdf(doc).toBlob();
}
