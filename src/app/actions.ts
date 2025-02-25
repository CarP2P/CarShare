"use server";

import { stripe } from '@/lib/stripe';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function BuyProduct(formData: FormData) {
    const rawId = formData.get('id');
    console.log('Raw ID from form:', rawId);
    const id = parseInt(rawId as string);

    if (isNaN(id)) {
        console.error('Invalid ID format');
        return redirect('/error');
    }

    const totalPrice = Number(formData.get('totalPrice'));
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        return redirect('/error');
    }

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{
            price_data: {
                currency: 'eur',
                unit_amount: totalPrice * 100,
                product_data: {
                    name: `${data.make} ${data.model}`,
                    images: data.photos ? [data.photos[0]] : [],
                },
            },
            quantity: 1,
        }],
        success_url: `https://car-share-lac.vercel.app/payment/success`,
        cancel_url: `https://car-share-lac.vercel.app/payment/cancel`,
    });

    return redirect(session.url as string);
}