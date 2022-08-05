import { Image, Text, View } from "@react-pdf/renderer";
import { styles } from "../ResumeStyle";

export const PersonItem = ({ info }) => {
  return (
    <View style={styles.personInfo}>
      <Text style={styles.username}>
        {info?.first_name} {info?.last_name}
      </Text>
      <View style={styles.infoRow}>
        {info?.Phone && (
          <View style={styles.iconInfo}>
            <Image
              style={styles.icon}
              src="https://img.icons8.com/ios/50/000000/phone.png"
            />
            <Text style={styles.text}>{info.Phone}</Text>
          </View>
        )}
        {info?.Email && (
          <View style={styles.iconInfo}>
            <Image
              style={styles.icon}
              src="https://img.icons8.com/windows/32/000000/new-post.png"
            />
            <Text style={styles.text}>{info.Email}</Text>
          </View>
        )}
        {info?.City && (
          <View style={styles.iconInfo}>
            <Image
              style={styles.icon}
              src="https://img.icons8.com/ios/50/000000/marker--v1.png"
            />
            <Text style={styles.text}>{info.City}</Text>
          </View>
        )}
      </View>
      <View style={styles.infoRow}>
        {info?.LinkedIn && (
          <View style={styles.iconInfo}>
            <Image
              style={styles.icon}
              src="https://img.icons8.com/ios/50/000000/linkedin.png"
            />
            <Text style={styles.text}>{info.LinkedIn}</Text>
          </View>
        )}
        {info?.Personal_Website && (
          <View style={styles.iconInfo}>
            <Image
              style={styles.icon}
              src="https://img.icons8.com/fluency-systems-regular/48/000000/monitor--v1.png"
            />
            <Text style={styles.text}>{info.Personal_Website}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export const EducationItem = ({ listEdu }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>EDUCATION</Text>
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
      <Text style={styles.title}>ADDITIONAL EXPERIENCES</Text>
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
  console.log("🚀 ~ listProj", listProj);
  return (
    <View style={styles.section}>
      <Text style={styles.title}>RELEVANT PROJECTS</Text>
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
      <Text style={styles.title}>{section.toUpperCase()}</Text>
      <Text>{description}</Text>
    </View>
  );
};
