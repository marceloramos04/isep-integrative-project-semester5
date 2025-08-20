using Backoffice.Models;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.DTO;
using Backoffice.Models.Mappers;
using Backoffice.Repositories;
using Backoffice.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backoffice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationTypeController : ControllerBase
    {
        private readonly OperationTypeService _service;

        public OperationTypeController(BackofficeContext context)
        {
            _service = new OperationTypeService(new OperationTypeRepository(context));
        }
        
        [HttpPost]
        public async Task<ActionResult<OperationTypeDTO>> CreateOperationType([FromBody] OperationTypeDTO newOperationTypeDto)
        {
            try
            {
                var createdOperationType = await _service.CreateOperationType(newOperationTypeDto);
                return CreatedAtAction(nameof(GetOperationType), new { id = createdOperationType.id }, createdOperationType);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OperationTypeDTO>>> GetOperationTypes()
        {
            return Ok(await _service.GetOperationTypes());
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<OperationTypeDTO>>> SearchOperationTypes(
            string? name,
            string? specialization,
            string? status
        )
        {
            return Ok(await _service.SearchOperationTypes(name, specialization, status));
        }

        [HttpGet("specializations")]
        public async Task<ActionResult<IEnumerable<string>>> GetSpecializations()
        {
            return Ok(_service.GetSpecializations());
        }

        [HttpGet("statuses")]
        public async Task<ActionResult<IEnumerable<string>>> GetStatuses()
        {
            return Ok(await _service.GetStatuses());
        }

        [HttpGet("roles")]
        public async Task<ActionResult<IEnumerable<string>>> GetRoles()
        {
            return Ok(await _service.GetRoles());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OperationTypeDTO>> GetOperationType(long id)
        {
            var operationType = await _service.GetOperationType(id);

            if (operationType == null)
            {
                return NotFound();
            }

            return Ok(operationType);
        }
    }
}
