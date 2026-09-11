import airtelTigo from "#/assets/partners/airteltigo.svg";
import aws from "#/assets/partners/aws.svg";
import citronGreenEnergy from "#/assets/partners/citron.svg";
import deepFrontlineShippers from "#/assets/partners/deep-frontline.svg";
import dominos from "#/assets/partners/dominos.svg";
import eastVessel from "#/assets/partners/east-vessel.svg";
import eatNGo from "#/assets/partners/eatngo.svg";
import fanMilk from "#/assets/partners/fanmilk.svg";
import flourMillsOfNigeria from "#/assets/partners/fmn.svg";
import gitexGlobal from "#/assets/partners/gitex.svg";
import inec from "#/assets/partners/inec.svg";
import industrialTrainingFund from "#/assets/partners/itf.svg";
import nafdac from "#/assets/partners/nafdac.svg";
import nationalDirectorateOfEmployment from "#/assets/partners/nde.svg";
import northbridgeEnergy from "#/assets/partners/nel.svg";
import nnpc from "#/assets/partners/nnpc.svg";
import nsitf from "#/assets/partners/nsitf.svg";
import peak from "#/assets/partners/peak.svg";
import planetProjects from "#/assets/partners/pp.svg";
import trexm from "#/assets/partners/trexm.svg";
import universityOfIlorin from "#/assets/partners/university-of-ilorin.png";
import venco from "#/assets/partners/venco.svg";
import vurinGroup from "#/assets/partners/vurin.svg";
import zeconia from "#/assets/partners/zeconia.svg";
import zolaElectric from "#/assets/partners/zola.svg";

export type PartnerLogo = {
  readonly logo: string;
  readonly name: string;
};

export const PartnerLogos: readonly PartnerLogo[] = [
  {logo: aws, name: "Amazon Web Services"},
  {logo: inec, name: "Independent National Electoral Commission"},
  {logo: dominos, name: "Domino's Pizza"},
  {logo: nnpc, name: "NNPC"},
  {logo: nafdac, name: "NAFDAC"},
  {logo: fanMilk, name: "FanMilk"},
  {logo: airtelTigo, name: "AirtelTigo"},
  {logo: flourMillsOfNigeria, name: "Flour Mills of Nigeria"},
  {logo: gitexGlobal, name: "GITEX Global"},
  {logo: peak, name: "Peak"},
  {logo: industrialTrainingFund, name: "Industrial Training Fund"},
  {logo: zolaElectric, name: "Zola Electric"},
  {logo: nsitf, name: "Nigeria Social Insurance Trust Fund"},
  {logo: eatNGo, name: "Eat'N'Go"},
  {logo: universityOfIlorin, name: "University of Ilorin"},
  {logo: nationalDirectorateOfEmployment, name: "National Directorate of Employment"},
  {logo: venco, name: "Venco"},
  {logo: citronGreenEnergy, name: "Citron Green Energy"},
  {logo: northbridgeEnergy, name: "Northbridge Energy"},
  {logo: planetProjects, name: "Planet Projects"},
  {logo: eastVessel, name: "East Vessel"},
  {logo: deepFrontlineShippers, name: "Deep Frontline Shippers"},
  {logo: vurinGroup, name: "Vurin Group"},
  {logo: trexm, name: "Trexm"},
  {logo: zeconia, name: "Zeconia"},
];
