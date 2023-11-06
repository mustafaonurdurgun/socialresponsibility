using Infrastructure.Data.Postgres.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Request.Functional
{
    public class RegisterDto
    {
        public string Email { get; set; } = default!;
        public string UserName { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string FullName { get; set; } = default!;     
        public string Phone { get; set; } = default!;//
        public bool IsMale { get; set; } = default!;
        public string ImagePath { get; set; } = default!;//buna eğer resim girilmezse default foto
        //public UserType UserType { get; set; } 
       
    }
}
