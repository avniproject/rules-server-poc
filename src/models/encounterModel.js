import {
    Encounter,
    ModelGeneral as General,
    EncounterType,
    ProgramEnrolment
} from "openchs-models";
import { mapObservations } from "./observationModel";
import {mapIndividual} from "./individualModel";

export const mapEncounter = (request) => {
    const encounter = General.assignFields(
        request,
        new Encounter(),
        ["uuid", "encounterDateTime", "name", "dateOfBirth"],
        ["earliestVisitDateTime","maxVisitDateTime","cancelDateTime"]
      );
    encounter.encounterType = createEncounterType(request.encounterType);
    if(request.observations != undefined){
        encounter.observations = mapObservations(request.observations);
    }
    if(request.cancelObservations != undefined){
        encounter.cancelObservations = mapObservations(request.cancelObservations);
    }
    if(request.subject != undefined){
        encounter.individual = mapIndividual(request.subject);
        if(request.subject.enrolments != undefined){
            encounter.individual.enrolments = mapProgramEnrolment(request.subject.enrolments);
        }
        if(request.subject.encounters != undefined){
            encounter.individual.encounters = mapEncounters(request.subject.encounters);
        }
    }
    return encounter;
}

const mapProgramEnrolment = (request) => {
    return request.map(programEnrolment => {
        return mapBasicProgramEnrolment(programEnrolment);
    });
}

const mapEncounters = (request) => {
    return request.map(encounter => {
        return mapBasicEncounter(encounter);
    });
}

const mapBasicProgramEnrolment = (request) => {
    return General.assignFields(
        request,
        new ProgramEnrolment(),
        ["uuid", "voided"],
        ["encounterDateTime","programExitDateTime","enrolmentDateTime"]
      );
}

const mapBasicEncounter = (request) => {
    return General.assignFields(
        request,
        new Encounter(),
        ["uuid", "encounterDateTime", "name", "dateOfBirth"],
        ["earliestVisitDateTime","maxVisitDateTime","cancelDateTime"]
      );
}

const createEncounterType = (encounterTypeParam) => {
    const encounterType = new EncounterType();
    encounterType.uuid = encounterTypeParam.uuid;
    encounterType.name = encounterTypeParam.name;
    encounterType.operationalEncounterTypeName = encounterTypeParam.operationalEncounterTypeName;
    encounterType.displayName = encounterTypeParam.displayName;
    return encounterType;
}