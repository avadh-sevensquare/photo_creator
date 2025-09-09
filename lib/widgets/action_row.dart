import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../theme/app_theme.dart';

class ActionItem {
  final String label;
  final String iconAsset;
  final String semanticsLabel;
  const ActionItem({required this.label, required this.iconAsset, required this.semanticsLabel});
}

class ActionRow extends StatelessWidget {
  final List<ActionItem> items;
  const ActionRow({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: items.map((item) {
        return Semantics(
          label: item.semanticsLabel,
          button: true,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 72,
                height: 72,
                decoration: BoxDecoration(
                  color: const Color(0xFF121B2A),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.white.withOpacity(0.08)),
                ),
                child: Center(
                  child: SvgPicture.asset(
                    item.iconAsset,
                    width: 28,
                    height: 28,
                    colorFilter: const ColorFilter.mode(Colors.white, BlendMode.srcIn),
                    semanticsLabel: item.label,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                item.label,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white),
              )
            ],
          ),
        );
      }).toList(),
    );
  }
}

