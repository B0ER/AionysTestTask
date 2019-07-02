namespace TestAionys.Models.Database
{
    public class Client : BaseEntity
    {
        public string FirsName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string PhoneNumbers { get; set; }
    }
}