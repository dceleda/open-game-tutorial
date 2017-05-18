using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OpenGameListWebApp.ViewModels;
using Newtonsoft.Json;
using OpenGameListWebApp.Data;
using Nelibur.ObjectMapper;
using OpenGameListWebApp.Data.Items;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenGameListWebApp.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        private JsonSerializerSettings _defaultJsonSettings = new JsonSerializerSettings { Formatting = Formatting.Indented };
        private int _defaultNumberOfItems = 5;
        private int _maxNumberOfItems = 100;
        private ApplicationDbContext _dbContext;

        public ItemsController(ApplicationDbContext ctx)
        {
            _dbContext = ctx;
        }

        #region GET

        [HttpGet()]
        public IActionResult Get()
        {
            return NotFound(new { Error = "not found" });
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = _dbContext.Items.Where(i => i.Id == id).FirstOrDefault();

            if (item != null)
            {
                return new JsonResult(TinyMapper.Map<ItemViewModel>(item), _defaultJsonSettings);
            }
            else
            {
                return NotFound(new { Error = $"Item ID {id} has not been found." });
            }
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

            var items = _dbContext.Items.OrderByDescending(i => i.CreatedDate).Take(n).ToArray();

            return new JsonResult(MapToDataVewItems(items), _defaultJsonSettings);
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

            var items = _dbContext.Items.OrderByDescending(i => i.ViewCount).Take(n).ToArray();

            return new JsonResult(MapToDataVewItems(items), _defaultJsonSettings);
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

            var items = _dbContext.Items.OrderBy(i => Guid.NewGuid()).Take(n).ToArray();

            return new JsonResult(MapToDataVewItems(items), _defaultJsonSettings);
        }

        #endregion

        [HttpPost()]
        public IActionResult Add([FromBody]ItemViewModel vm)
        {
            if(vm != null)
            {
                var item = TinyMapper.Map<Item>(vm);
                item.CreatedDate = item.LastModifiedDate = DateTime.Now;

                //TODO: 
                item.UserId = _dbContext.Users.Where(u => u.UserName == "Admin").FirstOrDefault().Id;

                _dbContext.Items.Add(item);
                _dbContext.SaveChanges();

                return new JsonResult(TinyMapper.Map<ItemViewModel>(item), _defaultJsonSettings);
            }

            return new StatusCodeResult(500);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]ItemViewModel vm)
        {
            if (vm != null)
            {
                var item = _dbContext.Items.Where(i => i.Id == id).FirstOrDefault();
                if(item != null)
                {
                    item.UserId = vm.UserId;
                    item.Description = vm.Description;
                    item.Flags = vm.Flags;
                    item.Notes = vm.Notes;
                    item.Text = vm.Text;
                    item.Title = vm.Title;
                    item.Type = vm.Type;

                    item.LastModifiedDate = DateTime.Now;

                    _dbContext.SaveChanges();

                    return new JsonResult(TinyMapper.Map<ItemViewModel>(item), _defaultJsonSettings);
                }
            }

            return NotFound(new { Error = $"Item ID {id} has not been found" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = _dbContext.Items.Where(i => i.Id == id).FirstOrDefault();

            if(item != null)
            {
                _dbContext.Items.Remove(item);
                _dbContext.SaveChanges();

                return new OkResult();
            }

            return NotFound(new { Error = $"Item ID {id} has not been found" });
        }

        private List<ItemViewModel> MapToDataVewItems(Item[] items)
        {
            var vmItems = new List<ItemViewModel>(items.Count());

            foreach (var item in items)
            {
                vmItems.Add(TinyMapper.Map<ItemViewModel>(item));
            }

            return vmItems;
        }
    }
}
