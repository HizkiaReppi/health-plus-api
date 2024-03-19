/**
 * Calculates the average of the given array.
 * @param {number[]} array - The array of numbers.
 * @return {number} The average.
 */
const calculateAverage = (array) => {
  const result = array.reduce((acc, curr) => acc + curr, 0) / array.length;

  return parseFloat(result.toFixed(2));
};

/**
 * Calculates the assessment result based on the answers.
 * @param {number} nutritionScore - The nutrition score.
 * @param {number} physicalActivityScore - The physical activity score.
 * @param {number} mentalHealthScore - The mental health score.
 * @return {number} The assessment result.
 */
const calculateAssessmentResult = (
  nutritionScore,
  physicalActivityScore,
  mentalHealthScore,
) => {
  const totalScore =
    (nutritionScore + physicalActivityScore + mentalHealthScore) / 3;

  return parseFloat(totalScore.toFixed(2));
};

/**
 * Determines the description based on the score.
 * @param {number} skor - The score.
 * @return {string} The description.
 */
function tentukanDeskripsi(skor) {
  if (skor >= 4.5) {
    return 'Sangat baik';
  } else if (skor >= 3.5) {
    return 'Baik';
  } else if (skor >= 2.5) {
    return 'Cukup baik';
  } else if (skor >= 1.5) {
    return 'Kurang baik';
  } else {
    return 'Sangat kurang baik';
  }
}

/**
 * Determines the improvement suggestion based on the description and aspect.
 * @param {string} deskripsi - The description.
 * @param {string} aspek - The aspect.
 * @return {string} The improvement suggestion.
 */
function tentukanImprovement(deskripsi, aspek) {
  switch (deskripsi) {
    case 'Sangat baik':
      return `Anda telah memiliki kebiasaan yang sangat baik dalam ${aspek}.`;
    case 'Baik':
      return `Anda memiliki kebiasaan yang baik dalam ${aspek}, tetapi masih ada ruang untuk perbaikan.`;
    case 'Cukup baik':
      return `Anda telah melakukan beberapa hal yang baik dalam ${aspek}, namun masih perlu ditingkatkan.`;
    case 'Kurang baik':
      return `Anda perlu meningkatkan kebiasaan dalam ${aspek} untuk memperbaiki kesehatan Anda.`;
    case 'Sangat kurang baik':
      return `Anda harus segera memperbaiki kebiasaan dalam ${aspek} untuk menjaga kesehatan Anda.`;
    default:
      return 'Tidak ada saran perbaikan yang tersedia.';
  }
}

/**
 * Determines the suggestion based on the description and aspect.
 * @param {string} deskripsi - The description.
 * @param {string} aspek - The aspect.
 * @return {string} The suggestion.
 */
function tentukanSaran(deskripsi, aspek) {
  switch (deskripsi) {
    case 'Sangat baik':
      return 'Pertahankan kebiasaan yang baik dan tingkatkan lagi di area lain jika perlu.';
    case 'Baik':
      return 'Lakukan evaluasi terhadap kebiasaan Anda secara berkala dan terus tingkatkan.';
    case 'Cukup baik':
      return 'Tetapkan tujuan kebiasaan yang lebih sehat dan lakukan perubahan perlahan-lahan.';
    case 'Kurang baik':
      return `Mulailah dengan perubahan kecil untuk meningkatkan kebiasaan Anda dalam ${aspek}.`;
    case 'Sangat kurang baik':
      return 'Segera lakukan tindakan perbaikan dan pertimbangkan untuk mencari bantuan profesional jika diperlukan.';
    default:
      return 'Tidak ada saran khusus yang tersedia.';
  }
}

/**
 * Generates feedback based on the score and aspect.
 * @param {number} skor - The score.
 * @param {string} aspek - The aspect.
 * @return {Object} The feedback object.
 */
function generateFeedback(skor, aspek) {
  const deskripsi = tentukanDeskripsi(skor);
  const improvement = tentukanImprovement(deskripsi, aspek);
  const saran = tentukanSaran(deskripsi, aspek);

  return { skor, deskripsi, improvement, saran };
}

/**
 * Provides feedback to the user.
 * @param {number} skorMakanan - The score for nutrition.
 * @param {number} skorAktivitas - The score for `physical activity`.
 * @param {number} skorMental - The score for mental health.
 * @return {Object} The feedback object.
 */
function berikanUmpanBalik(skorMakanan, skorAktivitas, skorMental) {
  const feedbackMakanan = generateFeedback(skorMakanan, 'pola makan');
  const feedbackAktivitas = generateFeedback(skorAktivitas, 'aktivitas fisik');
  const feedbackMental = generateFeedback(skorMental, 'kesehatan mental');

  return {
    makanan: feedbackMakanan,
    aktivitas: feedbackAktivitas,
    mental: feedbackMental,
  };
}

export { calculateAverage, calculateAssessmentResult, berikanUmpanBalik };
