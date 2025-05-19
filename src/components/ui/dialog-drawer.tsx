"use client"

import * as React from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer"
import { cn } from "~/lib/utils"
import { useIsMobile } from "~/hooks/use-mobile"

interface BaseProps {
  children: React.ReactNode
}

interface RootDialogDrawerProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface DialogDrawerProps extends BaseProps {
  className?: string
  asChild?: true
}

const DialogDrawerContext = React.createContext<{ isDesktop: boolean }>({
  isDesktop: false,
})

const useDialogDrawerContext = () => {
  const context = React.useContext(DialogDrawerContext)
  if (!context) {
    throw new Error(
      "DialogDrawer components cannot be rendered outside the DialogDrawer Context",
    )
  }
  return context
}

const DialogDrawer = ({ children, ...props }: RootDialogDrawerProps) => {
  const isDesktop = !useIsMobile(640)
  const DialogDrawer = isDesktop ? Dialog : Drawer

  console.log("isDesktop", isDesktop)
  return (
    <DialogDrawerContext.Provider value={{ isDesktop }}>
      <DialogDrawer {...props} {...(!isDesktop && { autoFocus: true })}>
        {children}
      </DialogDrawer>
    </DialogDrawerContext.Provider>
  )
}

const DialogDrawerTrigger = ({ className, children, ...props }: DialogDrawerProps) => {
  const { isDesktop } = useDialogDrawerContext()
  const DialogDrawerTrigger = isDesktop ? DialogTrigger : DrawerTrigger

  return (
    <DialogDrawerTrigger className={className} {...props}>
      {children}
    </DialogDrawerTrigger>
  )
}

const DialogDrawerClose = ({ className, children, ...props }: DialogDrawerProps) => {
  const { isDesktop } = useDialogDrawerContext()
  const DialogDrawerClose = isDesktop ? DialogClose : DrawerClose

  return (
    <DialogDrawerClose className={className} {...props}>
      {children}
    </DialogDrawerClose>
  )
}

const DialogDrawerContent = ({ className, children, ...props }: DialogDrawerProps) => {
  const { isDesktop } = useDialogDrawerContext()
  const DialogDrawerContent = isDesktop ? DialogContent : DrawerContent

  return (
    <DialogDrawerContent className={className} {...props}>
      {children}
    </DialogDrawerContent>
  )
}

const DialogDrawerDescription = ({
  className,
  children,
  ...props
}: DialogDrawerProps) => {
  const { isDesktop } = useDialogDrawerContext()
  const DialogDrawerDescription = isDesktop ? DialogDescription : DrawerDescription

  return (
    <DialogDrawerDescription className={className} {...props}>
      {children}
    </DialogDrawerDescription>
  )
}

const DialogDrawerHeader = ({ className, children, ...props }: DialogDrawerProps) => {
  const { isDesktop } = useDialogDrawerContext()
  const DialogDrawerHeader = isDesktop ? DialogHeader : DrawerHeader

  return (
    <DialogDrawerHeader className={className} {...props}>
      {children}
    </DialogDrawerHeader>
  )
}

const DialogDrawerTitle = ({ className, children, ...props }: DialogDrawerProps) => {
  const { isDesktop } = useDialogDrawerContext()
  const DialogDrawerTitle = isDesktop ? DialogTitle : DrawerTitle

  return (
    <DialogDrawerTitle className={className} {...props}>
      {children}
    </DialogDrawerTitle>
  )
}

const DialogDrawerBody = ({ className, children, ...props }: DialogDrawerProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  )
}

const DialogDrawerFooter = ({ className, children, ...props }: DialogDrawerProps) => {
  const { isDesktop } = useDialogDrawerContext()
  const DialogDrawerFooter = isDesktop ? DialogFooter : DrawerFooter

  return (
    <DialogDrawerFooter className={className} {...props}>
      {children}
    </DialogDrawerFooter>
  )
}

export {
  DialogDrawer,
  DialogDrawerTrigger,
  DialogDrawerClose,
  DialogDrawerContent,
  DialogDrawerDescription,
  DialogDrawerHeader,
  DialogDrawerTitle,
  DialogDrawerBody,
  DialogDrawerFooter,
}
