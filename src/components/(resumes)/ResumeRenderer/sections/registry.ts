import Summary from "./Summary";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Links from "./Links";
import Languages from "./Languages";
import Contact from "./Contact";
import Tools from "./Tools";
import TechnicalSkills from "./TechnicalSkills";
import Internships from "./InternShips";
import Personal from "./Personal";
import Additional from "./Additional";

const sectionRegistry: Record<string, React.ComponentType<any>> = {
  personal: Personal,
  summary: Summary,
  experience: Experience,
  education: Education,
  skills: Skills,
  technicalskills: TechnicalSkills,
  internships: Internships,
  projects: Projects,
  certifications: Certifications,
  links: Links,
  languages: Languages,
  contact: Contact,
  tools: Tools,
  additional: Additional,
};

export default sectionRegistry;
