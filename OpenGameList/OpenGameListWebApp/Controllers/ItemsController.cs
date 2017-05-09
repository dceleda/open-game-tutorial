using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OpenGameListWebApp.ViewModels;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenGameListWebApp.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        private JsonSerializerSettings _defaultSettings = new JsonSerializerSettings { Formatting = Formatting.Indented };
        private int _defaultNumberOfItems = 5;
        private int _maxNumberOfItems = 100;

        [HttpGet()]
        public IActionResult Get()
        {
            return NotFound(new { Error = "not found" });
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return new JsonResult(GetSampleItems().Where(i => i.Id == id).FirstOrDefault(), _defaultSettings);
        }

        [HttpGet("GetLatest")]
        public IActionResult GetLatest()
        {
            return GetLatest(_defaultNumberOfItems);
        }

        // GET: api/items/GetLatest/5
        [HttpGet("GetLatest/{n}")]
        public JsonResult GetLatest(int n)
        {
            n = n > _maxNumberOfItems ? _maxNumberOfItems : n;

            var items = GetSampleItems().OrderByDescending(i => i.CreatedDate).Take(n);

            return new JsonResult(items, _defaultSettings);
        }

        [HttpGet("GetMostViewed")]
        public IActionResult GetMostViewed()
        {
            return GetMostViewed(_defaultNumberOfItems);
        }

        [HttpGet("GetMostViewed/{n}")]
        public IActionResult GetMostViewed(int n)
        {
            n = n > _maxNumberOfItems ? _maxNumberOfItems : n;

            var items = GetSampleItems().OrderByDescending(i => i.ViewCount).Take(n);

            return new JsonResult(items, _defaultSettings);
        }

        [HttpGet("GetRandom")]
        public IActionResult GetRandom()
        {
            return GetRandom(_defaultNumberOfItems);
        }

        [HttpGet("GetRandom/{n}")]
        public IActionResult GetRandom(int n)
        {
            n = n > _maxNumberOfItems ? _maxNumberOfItems : n;

            var items = GetSampleItems().OrderBy(i => Guid.NewGuid()).Take(n);

            return new JsonResult(items, _defaultSettings);
        }

        private List<ItemViewModel> GetSampleItems(int num = 999)
        {
            var items = new List<ItemViewModel>(num);

            var date = new DateTime(2015, 12, 31).AddDays(-num);

            for (int i = 0; i < num; i++)
            {
                int id = i + 1;

                items.Add(new ItemViewModel
                {
                    Id = id,
                    Title = $"Item {id} Title",
                    Description = $"This is a sample description for item {id}: bla bla bla",
                    CreatedDate = date.AddDays(id),
                    LastModifiedDate = date.AddDays(id),
                    ViewCount = num - id
                });
            }

            return items;
        }
    }
}
