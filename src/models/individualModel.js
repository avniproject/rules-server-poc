import {
  Individual,
  ModelGeneral as General,
  Gender,
  AddressLevel,
  SubjectType
} from "openchs-models";
import { mapObservation } from "./observationModel";

export const mapIndividual = individualDetails => {
  const individual = General.assignFields(
    individualDetails,
    new Individual(),
    ["uuid", "firstName", "lastName", "dateOfBirth"],
    ["registrationDate"]
  );
  const gender = new Gender();
  gender.name = individualDetails.gender;
  gender.uuid = individualDetails.genderUUID;
  individual.gender = gender;

  const subjectType = new SubjectType();
  subjectType.uuid = individualDetails.subjectType.uuid;
  subjectType.name = individualDetails.subjectType.name;
  individual.subjectType = subjectType;

  const addressLevel = new AddressLevel();
  addressLevel.uuid = individualDetails.lowestAddressLevel.uuid;
  addressLevel.name = individualDetails.lowestAddressLevel.name;
  individual.lowestAddressLevel = addressLevel;

  return individual;
};

//subject Dashboard profile Tab
export const mapProfile = subjectProfile => {
  if (subjectProfile) {
    let individual = mapIndividual(subjectProfile);
    individual.observations = mapObservation(subjectProfile["observations"]);
    return individual;
  }
};