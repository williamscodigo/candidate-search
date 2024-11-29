interface PlusFormProps {
  onSubmit: () => void;
}

export default function PlusForm({ onSubmit }: PlusFormProps) {

      function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        onSubmit(); //trigger onPlus callback
    
      }

      return (
             
<form className="" onSubmit={handleSubmit}>
            <button type='submit' className="plus-btn">+</button>
</form>
    );
}