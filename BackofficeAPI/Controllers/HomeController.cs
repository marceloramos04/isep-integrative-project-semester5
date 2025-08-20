using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_mvc_test.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public string Index()
    {
        return "Hello from SARM Backoffice API!";
    }
}
