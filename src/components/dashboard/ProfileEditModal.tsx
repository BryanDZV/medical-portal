"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/atoms/Modal";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { toast } from "sonner";

type ProfileEditModalProps = {
    isOpen: boolean;
    onClose: () => void;
    initialName: string;
    initialEmail: string;
};

const PROFILE_IMAGE_KEY = "profile-image";

export function ProfileEditModal({
    isOpen,
    onClose,
    initialName,
    initialEmail,
}: ProfileEditModalProps) {
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);

    const [previewImage, setPreviewImage] = useState<string | null>(() => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(PROFILE_IMAGE_KEY);
    });

    const initials = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const imageBase64 = reader.result as string;

            setPreviewImage(imageBase64);
            localStorage.setItem(PROFILE_IMAGE_KEY, imageBase64);
            toast.success("Imagen actualizada");
        };

        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        localStorage.removeItem(PROFILE_IMAGE_KEY);
        toast.success("Imagen eliminada");
    };

    const handleSave = () => {
        toast.success("Perfil actualizado correctamente");
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Editar perfil"
            subtitle="Actualiza tu información personal y profesional"
            size="xl"
        >
            <div className="space-y-7">
                <section className="flex items-center gap-8 border-b border-slate-100 pb-7">
                    <div className="relative flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-600 text-4xl font-bold text-white shadow-lg">
                        {previewImage ? (
                            <Image
                                src={previewImage}
                                alt="Imagen de perfil"
                                width={144}
                                height={144}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            initials
                        )}

                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-slate-900">
                            Imagen de perfil
                        </h3>

                        <p className="max-w-sm text-sm leading-6 text-slate-500">
                            Esta imagen será visible para tus pacientes y en todo el portal.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <label className="inline-block cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />

                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="pointer-events-none border border-slate-200 bg-white text-blue-600 shadow-sm"
                                >
                                    ⬆ Cambiar foto
                                </Button>
                            </label>

                            {previewImage && (
                                <Button
                                    type="button"
                                    variant="danger"
                                    onClick={handleRemoveImage}
                                >
                                    Eliminar foto
                                </Button>
                            )}
                        </div>

                        <p className="text-xs text-slate-400">
                            JPG, PNG o WEBP. Máx. 5MB
                        </p>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-5">
                    <div className="space-y-2">
                        <label
                            htmlFor="doctor-name"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Nombre
                        </label>

                        <Input
                            id="doctor-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre completo"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="doctor-email"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Email
                        </label>

                        <Input
                            id="doctor-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Correo electrónico"
                        />
                    </div>
                </section>

                <div className="flex justify-end gap-4 border-t border-slate-100 pt-6">
                    <Button variant="secondary" size="lg" onClick={onClose}>
                        Cancelar
                    </Button>

                    <Button size="lg" onClick={handleSave}>
                        Guardar cambios ✓
                    </Button>
                </div>
            </div>
        </Modal>
    );
}