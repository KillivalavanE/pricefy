import Image from "next/image"
import Link from "next/link"

const navIcons = [
  {src: '/assets/icons/search.svg', alt:'search-icon'},
  {src: '/assets/icons/black-heart.svg', alt:'heart-icon'},
  {src: '/assets/icons/user.svg', alt:'user-icon'}
];

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/assets/icons/logo.svg" width={27} height={27} alt="logo"/>
          <p className="nav-logo">Prici<span className="text-primary">fy</span></p>
        </Link>
        <div className="flex items-center gap-5">
          {navIcons.map((icon) => (
            <Image src={icon.src} key={icon.alt} alt={icon.alt} height={28} width={28} className="object-contain"/>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar