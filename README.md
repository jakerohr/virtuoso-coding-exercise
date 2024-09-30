# virtuoso-coding-exercise
Coding Exercise for Jake Rohr

## Description

This project is a simple web application that allows users to search for artworks in the MET Museum's collection. It uses the MET Museum's API to fetch artwork data and display it in a list.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/virtuoso-coding-exercise.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Enter a search term in the search bar and click "Search" to see a list of artworks.
3. Click on an artwork to see more details.

## ObjectiveI 
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
- **Caching**: While caching would be ideal, the focus was on progressive loading.
- **Loading Impact**: The number of items loaded and the speed of loading greatly impacts the user experience.
- **Accurate Top Departments**: The top departments are determined by currently loaded items. By progressively loading more items, the top departments are affected.
- **Batch Data Fetching**: Decided to batch data fetching and display the number of items loaded versus the total.

## Additional Information
Some additional information specific to the inner directory.

## Contributing
Guidelines for contributing to the project.

## License
License information.

