import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({ family: "Roboto", fontStyle: "normal", fontWeight: "bold" });

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    marginTop: "20px",
  },
  personInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    fontFamily: "Helvetica-Bold",
    fontSize: "16px",
  },
  text: {
    fontSize: "10px",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "10px",
    marginTop: "2px",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  iconInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "10px",
  },
  section: {
    flexDirection: "column",
    margin: "0 40px",
    marginTop: "10px",
  },
  subsection: {
    marginTop: "5px",
  },
  icon: {
    width: "10px",
    height: "10px",
    marginRight: "3px",
  },
  title: {
    color: "#4183FF",
    fontSize: "10px",
    fontFamily: "Helvetica-Bold",
    width: "100%",
    paddingBottom: "3px",
    borderBottom: "1px solid #4183FF",
    marginBottom: "2px",
  },
  subtitle: {
    fontSize: "10px",
    fontFamily: "Helvetica-Bold",
    marginBottom: "1px",
  },
  time: {
    fontSize: "8px",
  },
});
