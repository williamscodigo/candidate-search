

export default function MinusForm() {

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      // Call backend API to add actor to favorites
      console.log("minus form submitted!");
  
    }

    return (
           
<form className="" onSubmit={handleSubmit}>
          <button type='submit' className="minus-btn">-</button>
</form>
  );
}