import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:lottie/lottie.dart';
import 'package:provider/provider.dart';

import '../theme/app_theme.dart';
import '../widgets/gradient_cta_button.dart';
import '../widgets/dots_indicator.dart';
import '../widgets/hero_card.dart';
import '../widgets/category_selector.dart';
import '../widgets/action_row.dart';
import '../widgets/gallery_preview.dart';
import 'onboarding_state.dart';

class OnboardingCarousel extends StatelessWidget {
  const OnboardingCarousel({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => OnboardingState(),
      child: const _OnboardingScaffold(),
    );
  }
}

class _OnboardingScaffold extends StatelessWidget {
  const _OnboardingScaffold();

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<OnboardingState>(context);
    final media = MediaQuery.of(context);

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            children: [
              Expanded(
                child: PageView(
                  controller: state.pageController,
                  onPageChanged: state.setPage,
                  physics: const BouncingScrollPhysics(),
                  children: const [
                    _ScreenTryOn(),
                    _ScreenTransform(),
                    _ScreenSaveShare(),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              DotsIndicator(count: 3, activeIndex: state.currentPage),
              const SizedBox(height: 16),
              GradientCTAButton(
                label: state.currentPage == 2 ? 'Try Now' : 'Next',
                semanticsLabel: state.currentPage == 2 ? 'Try now' : 'Next step',
                onPressed: () async {
                  if (state.currentPage < 2) {
                    await state.nextPage();
                  } else {
                    // End of onboarding. For demo, show a loader.
                    showDialog(
                      context: context,
                      barrierDismissible: true,
                      builder: (_) => Center(
                        child: Lottie.asset(
                          'assets/lottie/spinner.json',
                          width: 120,
                          height: 120,
                        ),
                      ),
                    );
                    await Future.delayed(const Duration(seconds: 1));
                    if (context.mounted) Navigator.of(context).pop();
                  }
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ScreenTryOn extends StatefulWidget {
  const _ScreenTryOn();

  @override
  State<_ScreenTryOn> createState() => _ScreenTryOnState();
}

class _ScreenTryOnState extends State<_ScreenTryOn> {
  String selected = 'dress';

  @override
  Widget build(BuildContext context) {
    final page = context.watch<OnboardingState>().currentPage;
    final double parallax = page == 0 ? 0 : -12;

    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        HeroCard(
          semanticsLabel: 'Before and After try-on preview',
          parallax: parallax.toDouble(),
          child: _heroBeforeAfter(),
        ),
        const SizedBox(height: 20),
        CategorySelector(
          options: const [
            CategoryOption('dress', 'Dress', 'assets/icons/dress.svg'),
            CategoryOption('glasses', 'Glasses', 'assets/icons/glasses.svg'),
            CategoryOption('hat', 'Hat', 'assets/icons/hat.svg'),
            CategoryOption('bag', 'Bag', 'assets/icons/bag.svg'),
          ],
          selectedId: selected,
          onChanged: (id) => setState(() => selected = id),
        ),
        const SizedBox(height: 16),
        _headline(
          context,
          '1-Click to Try On Trendy Outfits',
          'See yourself in the latest fashion instantly with our AI-powered try-on technology.',
        ),
      ],
    );
  }

  Widget _heroBeforeAfter() {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          Expanded(child: _miniCard(label: 'Before')),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: SvgPicture.asset(
              'assets/icons/arrow_right.svg',
              width: 24,
              height: 24,
              colorFilter: const ColorFilter.mode(Colors.white, BlendMode.srcIn),
              semanticsLabel: 'Arrow',
            ),
          ),
          Expanded(child: _miniCard(label: 'After')),
        ],
      ),
    );
  }

  Widget _miniCard({required String label}) {
    return Stack(
      children: [
        Container(
          height: 160,
          decoration: BoxDecoration(
            color: const Color(0xFF1A2435),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Colors.white.withOpacity(0.08)),
          ),
        ),
        Positioned(
          left: label == 'Before' ? 12 : null,
          right: label == 'After' ? 12 : null,
          top: 12,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.08),
              borderRadius: BorderRadius.circular(999),
            ),
            child: Text(label, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600)),
          ),
        ),
      ],
    );
  }
}

class _ScreenTransform extends StatelessWidget {
  const _ScreenTransform();

  @override
  Widget build(BuildContext context) {
    final page = context.watch<OnboardingState>().currentPage;
    final double parallax = page == 1 ? 0 : (page < 1 ? 12 : -12);

    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        HeroCard(
          semanticsLabel: 'AI customization preview',
          parallax: parallax.toDouble(),
          child: Container(color: const Color(0xFF1A2435)),
        ),
        const SizedBox(height: 20),
        ActionRow(
          items: const [
            ActionItem(label: 'Snap', iconAsset: 'assets/icons/snap.svg', semanticsLabel: 'Snap a photo'),
            ActionItem(label: 'Try On', iconAsset: 'assets/icons/tryon.svg', semanticsLabel: 'Try on outfit'),
            ActionItem(label: 'Love It', iconAsset: 'assets/icons/love.svg', semanticsLabel: 'Love it'),
          ],
        ),
        const SizedBox(height: 16),
        _headline(
          context,
          'Transform any outfit with AI-Powered Customisation',
          'Personalize fits with colors and styles in seconds.',
        ),
      ],
    );
  }
}

class _ScreenSaveShare extends StatelessWidget {
  const _ScreenSaveShare();

  @override
  Widget build(BuildContext context) {
    final page = context.watch<OnboardingState>().currentPage;
    final double parallax = page == 2 ? 0 : 12;

    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        HeroCard(
          semanticsLabel: 'Gallery preview',
          parallax: parallax.toDouble(),
          child: const Padding(
            padding: EdgeInsets.all(16.0),
            child: GalleryPreview(),
          ),
        ),
        const SizedBox(height: 20),
        _headline(
          context,
          'Save & Share Your Looks in Stunning Quality',
          'Capture, curate, and showcase your style with the world.',
        ),
      ],
    );
  }
}

Widget _headline(BuildContext context, String title, String subtitle) {
  final textScale = MediaQuery.textScaleFactorOf(context);
  return Column(
    children: [
      Text(
        title,
        textAlign: TextAlign.center,
        style: Theme.of(context).textTheme.displayLarge,
      ),
      const SizedBox(height: 12),
      ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 600),
        child: Text(
          subtitle,
          textAlign: TextAlign.center,
          style: Theme.of(context).textTheme.bodyLarge,
        ),
      ),
    ],
  );
}

