const StarRating = ({ value, onChange }) => (
  <div className="flex gap-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <button key={star} type="button" className={`text-2xl ${star <= value ? "text-warning" : "text-slate-500"}`} onClick={() => onChange(star)}>
        ★
      </button>
    ))}
  </div>
);

export default StarRating;
