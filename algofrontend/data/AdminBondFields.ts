import { AdminBondFieldName } from "@/schemas/AdminBondSchema";

export interface AdminSelectField {
    name: AdminBondFieldName;
    type: "select";
    placeholder: string;
    options: string[];
  }
  
  interface TextField {
    name: AdminBondFieldName;
    type: "text";
    placeholder: string;
  }
  
  interface DateField {
    name: AdminBondFieldName;
    type: "date";
    placeholder: string;
  }
  
  interface NumberField {
    name: AdminBondFieldName;
    type: "number";
    placeholder: string;
    min?: number;
  }
  
export type AllAddFormField = AdminSelectField | TextField | DateField | NumberField;

export type AllAddFormValues = {
    [K in keyof AllAddFormField]: "type" extends keyof AllAddFormField[K]
      ? AllAddFormField[K]["type"] extends "select"
        ? string
        : AllAddFormField[K]["type"] extends "number"
        ? string
        : AllAddFormField[K]["type"] extends "date"
        ? string
        : string
      : string;
  };


export const AdminBondFields : AllAddFormField[] = [
    {
        name : "isin",
        type : "text",
        placeholder: "Code Isin",
    },
    {
        name : "space",
        type : "select",
        placeholder: "Economic Space",
        options: ['CEDEAO', 'CEMAC', 'COMORES', 'UEAC', 'UA']
    },
    {
        name : "description",
        type : "text",
        placeholder: "A brief description",
    },
    {
        name : "entity",
        type : "select",
        placeholder: "Entity",
        options: ['Country', 'Society']
    },
    {
        name : "due_date",
        type : "date",
        placeholder: "Bond Due Date",
    },
    {
        name : "facial_rate",
        type : "number",
        placeholder: "Bond Facial Rate",
    },
    {
        name : "refund",
        type : "select",
        placeholder: "Refund",
        options: ['IF', 'AC', 'ACD']
    },
    {
        name : "differed",
        type : "number",
        placeholder: "Differed",
        min: 0
    },
    {
        name : "guarantee",
        type : "select",
        placeholder: "Guarantee",
        options : ['Yes', 'No']
    },
    {
        name : "total_number",
        type : "number",
        placeholder: "Total Number",
        min: 0
    },
    {
        name : "type",
        type : "select",
        placeholder: "Bond Type",
        options : ['OAT', 'BAT']
    },
    {
        name : "period",
        type : "select",
        placeholder: "Bond Period",
        options : ['A', 'S', 'T']
    }
]

