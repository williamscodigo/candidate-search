

export default function PlusForm() {

      function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Call backend API to add actor to favorites
        console.log("plus form submitted!");
    
      }

      return (
             
<form className="" onSubmit={handleSubmit}>
            <button type='submit' className="plus-btn">+</button>
</form>
    );
}