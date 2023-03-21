import Link from 'next/link';
function Header() {
  return (
    <>
      <Link href="/" passHref>
        <h2>logo</h2>
      </Link>
    </>
  );
}
export default Header;
