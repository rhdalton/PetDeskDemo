namespace PetDeskDemo.Models
{

    public class Patient
    {
        public int animalId { get; set; }

        public string firstName { get; set; }

        public petSpecies? species { get; set; }

        public string? breed { get; set; }
    }

    public enum petSpecies
    {
        Bird,
        Cat,
        Dog
    };
}
