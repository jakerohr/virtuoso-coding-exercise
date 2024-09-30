# virtuoso-coding-exercise
Coding Exercise for Jake Rohr

## Description

This project is a simple web application that allows users to search for artworks in the MET Museum's collection. It uses the MET Museum's API to fetch artwork data and display it in a list.

## Live Demo

You can view the live demo of the project [here](https://virtuoso-exercise-jake-rohr.netlify.app/).

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/virtuoso-coding-exercise.git
cd virtuoso-coding-exercise
```

2. Navigate into the `met-museum-search` directory:

```bash
cd met-museum
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Click on a card image to open the lightbox.
3. Click anywhere else on the card to open the item page in a new tab.

## Objective
- Fetch results and render in cards.
- Ideally use Nuxt.
- Open lightbox and use larger image when clicking on image.

## Thoughts and Notes

### My Approach
- **Scaffolding**: Start with child components and build outward.
- **Development Methodology**: Use test-driven development (TDD).
- **Focus Areas**: Prioritize data handling and rendering first, then move on to styling.

### Challenges
- **Data Fetching**: Handling data fetching for 8000+ IDs that need to be fetched separately.
- **Caching**: While caching would be ideal, the focus was on progressively loading items.
- **Progressive Loading**: The number of items loaded and the speed of loading greatly impacts performance and user experience.
- **Accurate Top Departments**: The top departments are determined by currently loaded items. By progressively loading more items, the top departments are affected.
- **Batch Data Fetching**: Decided to batch data fetching and display the number of items loaded versus the total.

### Future Improvements
- **Caching**: Implement caching to improve performance and user experience.
- **Pagination**: Implement pagination to improve performance and user experience.
- **Loading Indicators**: Implement loading indicators to improve user experience.
- **Error Handling**: Implement error handling to improve user experience.
- **Accessibility**: Improve accessibility by adding aria labels and improving color contrast.
