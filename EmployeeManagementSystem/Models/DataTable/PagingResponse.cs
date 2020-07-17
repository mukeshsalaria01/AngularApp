
using Newtonsoft.Json;

namespace EmployeeManagementSystem.Models.DataTable
{
    public class PagingResponse
    {
        [JsonProperty(PropertyName = "draw")]
        public int Draw { get; set; }

        [JsonProperty(PropertyName = "recordsFiltered")]
        public int RecordsFiltered { get; set; }

        [JsonProperty(PropertyName = "recordsTotal")]
        public int RecordsTotal { get; set; }

        [JsonProperty(PropertyName = "data")]
        public   object[] data { get; set; }
    }
}
