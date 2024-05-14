"use client"
import { FormEvent, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { addUserEmailToProduct } from '@/lib/actions'

interface Props {
  productId: string
}

const Modal = ({ productId }: Props) => {
  let [isOpen, setIsOpen] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await addUserEmailToProduct(productId, email);

    setIsSubmitting(false)
    setEmail('')
    closeModal()
  }

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button type="button" className="btn" onClick={openModal}>
        Track
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={closeModal}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="absolute inset-0 bg-black opacity-30" onClick={closeModal} />

            <div className="relative p-8 bg-white rounded-xl">
              <div className="absolute top-0 right-0 p-3 cursor-pointer">
                <Image 
                  src="/assets/icons/x-close.svg"
                  alt="close"
                  width={24}
                  height={24}
                  onClick={closeModal}
                />
              </div>

              <h4 className="text-center text-xl font-bold mb-4">
                Stay updated with product pricing alerts right in your inbox!
              </h4>

              <p className="text-sm text-gray-600 mb-6">
                Never miss a bargain again with our timely alerts!
              </p>

              <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <br></br>
                <div className="flex items-center border rounded-md mt-2">
                    
                  <span className="px-3">
                    <Image 
                      src="/assets/icons/mail.svg"
                      alt='mail'
                      width={18}
                      height={18}
                    />
                  </span>
                  <input 
                    required
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 py-2 pl-2 border-none focus:outline-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  {isSubmitting ? 'Submitting...' : 'Track'}
                </button>
              </form>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
