using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using System.Net.Http;

namespace NGUWPAPI.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public async Task<string> Get()
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync("https://api.douban.com/v2/book/search?count=50&q=书");

                return await response.Content.ReadAsStringAsync();
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<string> Get(int id)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync("https://api.douban.com/v2/book/" + id);

                return await response.Content.ReadAsStringAsync();
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
