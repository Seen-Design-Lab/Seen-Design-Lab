
-- Seed data for the books table
INSERT INTO public.books (title, author, description, cover_image, category, folder, publication_date, page_count, pdf_url)
VALUES
  (
    'Design Systems Handbook',
    'Marco Suarez, Jina Anne, Katie Sylor-Miller',
    'A comprehensive guide to creating, documenting, and maintaining design systems.',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop',
    ARRAY['design'],
    'design-books',
    '2022',
    127,
    'https://example.com/design-systems-handbook.pdf'
  ),
  (
    'Atomic Design',
    'Brad Frost',
    'A methodology for creating design systems with five distinct levels: atoms, molecules, organisms, templates, and pages.',
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop',
    ARRAY['design'],
    'design-books',
    '2021',
    198,
    'https://example.com/atomic-design.pdf'
  ),
  (
    'Clean Code',
    'Robert C. Martin',
    'A handbook of agile software craftsmanship that helps programmers write better code.',
    'https://images.unsplash.com/photo-1629208113515-4ce8ce3de79d?q=80&w=1000&auto=format&fit=crop',
    ARRAY['technology'],
    'tech-books',
    '2008',
    464,
    'https://example.com/clean-code.pdf'
  ),
  (
    'Zero to One',
    'Peter Thiel',
    'Notes on startups, or how to build the future.',
    'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=1000&auto=format&fit=crop',
    ARRAY['business'],
    'business-books',
    '2014',
    224,
    'https://example.com/zero-to-one.pdf'
  ),
  (
    'The Design of Everyday Things',
    'Don Norman',
    'A powerful primer on how and why some products satisfy customers while others only frustrate them.',
    'https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1000&auto=format&fit=crop',
    ARRAY['design'],
    'design-books',
    '2013',
    368,
    'https://example.com/design-of-everyday-things.pdf'
  ),
  (
    'JavaScript: The Good Parts',
    'Douglas Crockford',
    'Unearthing the excellence in JavaScript, the world''s most misunderstood programming language.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    ARRAY['technology'],
    'tech-books',
    '2008',
    176,
    'https://example.com/javascript-good-parts.pdf'
  );
