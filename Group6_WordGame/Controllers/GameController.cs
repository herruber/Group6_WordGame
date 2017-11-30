using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Group6_WordGame;
using System.Reflection;
using System.IO;

namespace Group6_WordGame.Controllers
{
    public class GameController : Controller
    {
        string[] allsentences = {
                                "I am a cat",
                                "That tree is very dark",
                                "Bill played with his toy car",
                                "I can not help it"
                                };
        // GET: Game
        public ActionResult Index()
        {
            return View();
        }

        public List<string> GetWords()
        {
            Random rand = new Random();

            string[] currentwords = allsentences[rand.Next(0, 3)].Split(' ');

            List<string> buffer = new List<string>();

            currentwords.OrderBy(e => rand.Next(0, 3));

            return currentwords.ToList();
        }

        // GET: Game/Details/5
        public ActionResult Details(int id)
        {
            
            return View();
        }

        // GET: Game/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Game/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Game/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Game/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Game/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Game/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
