import { defineStore } from 'pinia'

export const useModelsStore = defineStore('modelsStore', {
  state: () => ({
    models: [] // Your array of models
  }),
  actions: {
    setActiveModel(modelId) {
      // First, set all models to inactive.
      this.models.forEach(model => {
        model.active = false
      })

      // Then, try to find and activate the model with the given modelId.
      const foundModel = this.models.find(model => model.id === modelId)
      if (foundModel) {
        foundModel.active = true
      }

      // After attempting to set the specified model as active,
      // check if any model is active.
      const isActiveModel = this.models.some(model => model.active)

      // If no model is active, set the first model as active, assuming the array is not empty.
      if (!isActiveModel && this.models.length > 0) {
        this.models[0].active = true
      }
    },
    initialSetModels(models) {
      // Ensure each model has an 'active' property when initially setting models
      this.models = models.map((model, index) => ({
        ...model,
        active: index === 0 // Only the first model is set to 'active'
      }))
    }
  },
  getters: {
    getModels: state => state.models
  }
})
