export function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0"); // Ensure two digits
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}
