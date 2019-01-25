/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**
 * Function to create a new medical record and add it to the patient's medical file.
 * @param {org.ehr.hackathon.CreateMedicalRecord} recordData The sample transaction instance.
 * @transaction
 * NOTE : recordData is an object of type CreateMedicalRecord
 */

async function CreateMedicalRecord(recordData){  
        return getParticipantRegistry('org.ehr.hackathon.Patient')
        .then(function(patientRegistry) {
//              console.log("OK");
              return patientRegistry.get(recordData.patient.patientId).then(function(patient){
//                console.log("BBB");
                  if(patient.medRec == null){
                    patient.medRec = [];
                  }
                var factory = getFactory();
                var newMedicalRecord = factory.newConcept('org.ehr.hackathon', 'MedicalRecord');
//                console.log("Plz : " + newMedicalRecord);

                if (newMedicalRecord.medicine == null) {
                  newMedicalRecord.medicine = [];
                }
                if (newMedicalRecord.quantity == null) {
                  newMedicalRecord.quantity = [];
                }
                if (newMedicalRecord.files == null) {
                  newMedicalRecord.files = [];
                }
                
                var newRecordId = recordData.doctor.firstName + '_' + recordData.patient.firstName + '_' + new Date().toLocaleDateString() + '_' + new Date().toLocaleTimeString();

                newMedicalRecord.recordId = newRecordId;   
            //    newMedicalRecord.patient = recordData.patient;
                newMedicalRecord.doctor = recordData.doctor;
                newMedicalRecord.medicine = recordData.medicine;
                newMedicalRecord.quantity = recordData.quantity;
                newMedicalRecord.diagnosis = recordData.diagnosis;
                newMedicalRecord.files = recordData.files;

                patient.medRec.push(newMedicalRecord);
                return patientRegistry.update(patient);
            })
        })
}