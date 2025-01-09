import { defineStore } from 'pinia';
import {calculateEmission, saveEmission} from "@/services/calculationService.js";

export const useCalculationStore = defineStore('calculationStore', {
    state: () => ({
        calculationData: {
            startLocation: "",
            endLocation: "",
            transportMode: "",
            fuelType: "",
            vehicleSize: "",
        },
        calculationResult: null,
        calculationSaveResult: null,
        error: null,
    }),
    getters: {
        getCalculationData(state) {
            return state.calculationData;
        },
        getCalculationResult(state) {
            return state.calculationResult;
        },
        getCalculationSaveResult(state) {
            return state.calculationSaveResult;
        },
    },
    actions: {
        async calculate() {
            //check this.caluclationData !== null
            try {
                const transportMediumDTO = {
                    transportMediumName: this.calculationData.transportMode,
                    transportMediumSize: this.calculationData.vehicleSize,
                    transportMediumFuel: this.calculationData.fuelType,
                };
                //manuelle Eingabe: check fuelConsumption

                const result = await calculateEmission(
                    this.calculationData.startLocation,
                    this.calculationData.endLocation,
                    transportMediumDTO
                );
                this.setCalculationResult(result);
                return result;
            } catch (error) {
                console.error('error in calculateEmission:', error);
                this.error = error;
                throw error;
            }
        },
        async save(groupName, groupPhrase, groupSize) {
            if(this.calculationResult === null) {
                return;
            }
            try {
                const transportMediumDTO = {
                    transportMediumName: this.calculationData.transportMode,
                    transportMediumSize: this.calculationData.vehicleSize,
                    transportMediumFuel: this.calculationData.fuelType,
                };
                //manuelle Eingabe: check fuelConsumption

                const groupEmissionDTO = {
                    groupEmission: this.calculationResult.emission,
                    groupEmissionNickName: groupName,
                    groupEmissionPassPhrase: groupPhrase,
                    groupEmissionSize: groupSize,
                };

                const result = await saveEmission(
                    this.calculationData.startLocation,
                    this.calculationData.endLocation,
                    this.calculationResult.distance,
                    transportMediumDTO,
                    groupEmissionDTO
                );
                this.setCalculationSaveResult(result);
                return result;
            } catch (error) {
                console.error('error in saveEmission:', error);
                this.error = error;
                throw error;
            }
        },
        updateCalculationData(newData) {
            Object.assign(this.calculationData, newData);
        },
        setCalculationData(data) {
            this.calculationData = data;
        },
        setCalculationResult(result) {
            this.calculationResult = result;
        },
        setCalculationSaveResult(result) {
            this.calculationSaveResult = result;
        },
    },
});
