export interface ParamsFormHTMEntity {
  idFormulario: string;
  tipoFormulario: string;
  numHerramienta: number;
  cadenaRepresentacion: string;
  objetosWorkflow: ObjetoWorkflowHTMEntity;
}

export interface ObjetoWorkflowHTMEntity {
  [key: string]: string;
}
