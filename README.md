# adaptive-ui

A highly opinionated wrapper for Mantine to quickly scaffold data-driven web prototypes

## Installation

1. Navigate to your React project's `/components/` directory
2. Run `git submodule add https://github.com/lorencerri/adaptive-ui`

## Styling

Internally, adaptive-ui uses [Mantine](https://mantine.dev/) components and css variables. You can override the default styling by passing your own via the `MantineProvider` component.

## Example

```tsx
const links = [
  /* ... */
];

export default function Index() {
  const Logo = <Heading text="plexi.dev" highlight="plexi" /* TODO */ />;

  return (
    <AdaptiveLayout dots={{ seed: "abcd" }}>
      <Header logo={<Logo />} links={links} />
      <Hero /* TODO */ />
      <List /* TODO */ />
      <Heading text="Meet The Team" highlight="Team" />
      <UserGrid /* TODO */ />
      <Heading text="Major Projects" highlight="Projects" />
      <CardGrid /* TODO */ />
      <Footer logo={<Logo />} links={links} />
    </AdaptiveLayout>
  );
}
```
