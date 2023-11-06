using Business.Models.Response;
using Business.Services.Base;
using Business.Services.Interface;
using Business.Utilities.Mapping.Interface;
using Infrastructure.Data.Postgres;
using Infrastructure.Data.Postgres.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class CategoryService:BaseService<Category,int,CategoryInfoDto>,ICategoryService
    {
        public CategoryService(IUnitOfWork unitOfWork, IMapperHelper mapperHelper) : base(unitOfWork,  unitOfWork.Categories, mapperHelper)
        {
        }
    }
}
