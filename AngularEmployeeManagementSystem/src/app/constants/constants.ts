export class EmployeeConstants {
    public static apiUrl = `https://localhost:44332/api/employee/`;
}

export class AccountConstants {
    public static apiUrl = `https://localhost:44332/api/account/`;
}

export class CustomerConstants {
    public static apiUrl = `https://localhost:44332/api/customer/`;
}


export class AppSettings {
    public static form_template = [
    {
      "type":"textBox",
      "label":"Name",
    },
     {
        "type":"textBox",
        "label":"Position",
      },
     {
      "type":"textBox",
      "label":"office"
     },
     {
      "type":"number",
      "label":"Age"
     },
     {
      "type":"number",
      "label":"Salary"
     },
     {
      "type":"email",
      "label":"Email"
     },
     
    {
      "type":"select",
      "label":"Role",
      "options":["Admin","Super Admin","User"]
    }


  ]
}



