import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../theme/app_theme.dart';
import '../onboarding/onboarding_state.dart';

class CategorySelector extends StatelessWidget {
  final OutfitCategory? selected;
  final void Function(OutfitCategory) onSelect;

  const CategorySelector({super.key, required this.selected, required this.onSelect});

  @override
  Widget build(BuildContext context) {
    final items = [
      (OutfitCategory.dress, 'Dress', 'assets/icons/dress.svg'),
      (OutfitCategory.glasses, 'Glasses', 'assets/icons/glasses.svg'),
      (OutfitCategory.hat, 'Hat', 'assets/icons/hat.svg'),
      (OutfitCategory.bag, 'Bag', 'assets/icons/bag.svg'),
    ];
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: items.map((e) {
        final bool isSelected = selected == e.$1;
        return _CategoryButton(
          label: e.$2,
          iconPath: e.$3,
          selected: isSelected,
          onTap: () => onSelect(e.$1),
        );
      }).toList(),
    );
  }
}

class _CategoryButton extends StatefulWidget {
  final String label;
  final String iconPath;
  final bool selected;
  final VoidCallback onTap;

  const _CategoryButton({required this.label, required this.iconPath, required this.selected, required this.onTap});

  @override
  State<_CategoryButton> createState() => _CategoryButtonState();
}

class _CategoryButtonState extends State<_CategoryButton> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    final disable = MediaQuery.of(context).disableAnimations;
    return Semantics(
      button: true,
      label: 'Try ${widget.label}',
      child: GestureDetector(
        onTapDown: (_) => setState(() => _pressed = true),
        onTapCancel: () => setState(() => _pressed = false),
        onTapUp: (_) => setState(() => _pressed = false),
        onTap: widget.onTap,
        child: AnimatedScale(
          duration: disable ? Duration.zero : const Duration(milliseconds: 160),
          scale: _pressed || widget.selected ? 1.06 : 1.0,
          child: Container(
            width: 72,
            height: 72,
            decoration: BoxDecoration(
              color: const Color(0xFF131C2B),
              borderRadius: AppRadii.card,
              border: Border.all(
                color: widget.selected ? AppColors.accentPurple : const Color(0xFF233049),
                width: widget.selected ? 3 : 1,
              ),
              gradient: widget.selected
                  ? const LinearGradient(colors: [Color(0x3319D3E6), Color(0x33A661FF)])
                  : null,
            ),
            child: Stack(
              children: [
                Center(
                  child: SvgPicture.asset(
                    widget.iconPath,
                    width: 28,
                    height: 28,
                    colorFilter: const ColorFilter.mode(Colors.white, BlendMode.srcIn),
                    semanticsLabel: widget.label,
                  ),
                ),
                if (widget.selected)
                  Positioned(
                    right: 6,
                    top: 6,
                    child: AnimatedOpacity(
                      duration: disable ? Duration.zero : const Duration(milliseconds: 200),
                      opacity: 1,
                      child: Container(
                        width: 18,
                        height: 18,
                        decoration: const BoxDecoration(
                          color: AppColors.accentGreen,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.check, size: 14, color: Colors.black),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

