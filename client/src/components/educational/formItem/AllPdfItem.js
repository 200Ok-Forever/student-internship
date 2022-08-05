import { Text, View } from "@react-pdf/renderer";
import { styles } from "../ResumeStyle";

export const PersonItem = ({ info }) => {
  return (
    <View style={styles.section}>
      <Text>
        {info?.first_name} {info?.last_name}
      </Text>
      <Text>{info?.first_name}</Text>
      <Text>{info?.Phone}</Text>
      <Text>{info?.Email}</Text>
      <Text>{info?.LinkedIn}</Text>
      <Text>{info?.Personal_Website}</Text>
    </View>
  );
};

export const EducationItem = ({ listEdu }) => {
  console.log(
    "🚀 ~ item?.Start.toLocaleString()",
    listEdu[0]?.Start.toLocaleString().split(",")[0]
  );

  return (
    <View style={styles.section}>
      <Text>EDUCATION</Text>
      {listEdu.map((item, i) => (
        <View key={`edu_${i}`}>
          <Text>{item?.School}</Text>
          <Text>{item?.Major}</Text>
          <Text>{item?.Degree}</Text>
          <Text>{item?.Location}</Text>
          <Text>{item?.Start.toLocaleString().split(",")[0]}</Text>
          <Text>{item?.End.toLocaleString().split(",")[0]}</Text>
          <Text>{item?.Description}</Text>
        </View>
      ))}
    </View>
  );
};

export const WorkItem = ({ listWork }) => {
  return (
    <View style={styles.section}>
      <Text>ADDITIONAL EXPERIENCES</Text>
      {listWork.map((item, i) => (
        <View key={`work_${i}`}>
          <Text>{item?.Company}</Text>
          <Text>{item?.Location}</Text>
          <Text>{item?.Position}</Text>
          <Text>{item?.Start.toLocaleString().split(",")[0]}</Text>
          <Text>{item?.End.toLocaleString().split(",")[0]}</Text>
          <Text>{item?.Description}</Text>
        </View>
      ))}
    </View>
  );
};

export const ProjItem = ({ listProj }) => {
  return (
    <View style={styles.section}>
      <Text>RELEVANT PROJECTS</Text>
      {listProj.map((item, i) => (
        <View key={`Proj_${i}`}>
          <Text>{item?.Project_Name}</Text>
          <Text>{item?.Description}</Text>
        </View>
      ))}
    </View>
  );
};

export const OtherItem = ({ section, description }) => {
  return (
    <View style={styles.section}>
      <Text>{section}</Text>
      <Text>{description}</Text>
    </View>
  );
};
