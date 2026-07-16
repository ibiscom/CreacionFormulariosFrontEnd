export interface ParamsFormConsultaHTMEntity {
  idFormulario: string;
  tipoFormulario: string;
  numHerramienta: number;
  cadenaRepresentacion: string;
  objetosWorkflow: ObjetoWorkflowConsultaHTMEntity;
}

export interface ObjetoWorkflowConsultaHTMEntity {
  [key: string]: string;
}
